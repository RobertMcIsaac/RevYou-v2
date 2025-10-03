import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { InjectModel } from '@nestjs/mongoose';
import { Campaign, CampaignDocument } from './schema/campaign.schema';
import { Model, Types } from 'mongoose';
import { ProjectService } from '../project/project.service';
import { Project, ProjectDocument } from '../project/schema/project.schema';
import { Respondent } from './schema/subdocument/respondent.schema';

interface ProjectWithTeam extends Project {
  team?: Respondent[];
}

@Injectable()
export class CampaignService {
  private readonly logger = new Logger(CampaignService.name);
  constructor(
    @InjectModel(Campaign.name) private campaignModel: Model<CampaignDocument>,
    private readonly userService: UserService,
    private readonly projectService: ProjectService,
  ) {}

  async createCampaign(
    title: string,
    createdBy: string,
    projects: ProjectWithTeam[],
    description?: string,
  ) {
    this.logger.debug(
      `Creating campaign: title="${title}", createdBy=[REDACTED], projectsCount=${projects.length}, descriptionLength=${description ? description.length : 0}`
    );

    if (!title || !createdBy || !projects) {
      this.logger.warn('Missing required fields for creating campaign');
      throw new BadRequestException(
        'Title, createdBy, and projects are required',
      );
    }

    const creatorId = await this.userService.findUserById(createdBy);
    if (!creatorId) {
      this.logger.warn(`User not found: ${createdBy}`);
      throw new NotFoundException(
        "User's id provided not found in the database",
      );
    }

    const projectsIds: Types.ObjectId[] =
      await this.projectService.findOrCreateProjects(projects);

    const campaignProjects = projectsIds.map((projectId, index) => {
      const team = projects[index]?.team
        ? projects[index].team.map((member: Respondent) => ({
            fullName: member.fullName,
            email: member.email,
            role: member.role,
            link: member.link,
            isResponded: member.isResponded ?? false,
          }))
        : undefined;

      return {
        project: projectId,
        team,
      };
    });

    const newCampaign = {
      title,
      description,
      createdBy: creatorId,
      projects: campaignProjects,
    };

    this.logger.log(`Creating new campaign: ${JSON.stringify(newCampaign)}`);
    return await this.campaignModel.create(newCampaign);
  }

  async getCampaignsByUser(userId: string) {
    if (!userId) {
      this.logger.warn('User ID is required');
      throw new BadRequestException('User ID is required');
    }

    this.logger.log(`Fetching campaigns for user ID: ${userId}`);
    return await this.campaignModel
      .find({ createdBy: new Types.ObjectId(userId) })
      .populate('projects.project');
  }

  async getCampaignById(campaignId: string) {
    if (!campaignId) {
      this.logger.warn('Campaign ID is not set');
      throw new BadRequestException('Campaign ID is not set');
    }
    const campaign = await this.campaignModel
      .findById(campaignId)
      .populate('projects.project')
      .populate('createdBy', 'email fullName');
    if (!campaign) {
      this.logger.warn(`Campaign not found: ${campaignId}`);
      throw new NotFoundException('Campaign not found');
    }
    this.logger.log(`Found campaign with ID: ${campaignId}`);
    return campaign;
  }

  async getCampaignByLink(linkUuid: string) {
    if (!linkUuid) {
      this.logger.warn('Link is not set');
      throw new BadRequestException('Link is not set');
    }

    const campaign = await this.campaignModel
      .findOne({ 'projects.team.link': { $regex: `${linkUuid}$` } })
      .populate('projects.project')
      .populate('createdBy', 'email firstName lastName');
    if (!campaign) {
      this.logger.warn(`Campaign not found for link: ${linkUuid}`);
      throw new NotFoundException('Campaign not found');
    }

    const projectEntry = campaign.projects.find((p) =>
      p.team.some((member) => member.link.endsWith(linkUuid)),
    );
    if (!projectEntry) {
      this.logger.warn(`Project entry not found for link: ${linkUuid}`);
      throw new NotFoundException(
        'Project entry with the specified link not found',
      );
    }
    const teamMember = projectEntry.team.find((member) =>
      member.link.endsWith(linkUuid),
    );
    if (!teamMember) {
      this.logger.warn(`Team member not found for link: ${linkUuid}`);
      throw new NotFoundException(
        'Team member with the specified link not found',
      );
    }

    const projectDoc =
      typeof projectEntry.project === 'object' &&
      'title' in projectEntry.project
        ? (projectEntry.project as unknown as ProjectDocument)
        : null;

    if (!projectDoc) {
      this.logger.warn(`Project details not found for link: ${linkUuid}`);
      throw new NotFoundException('Project details not found');
    }

    const campaignId = campaign._id.toString();
    this.logger.log(`Found campaign details for link: ${linkUuid}`);
    return {
      campaignId: campaignId,
      title: campaign.title,
      requestor: {
        fullName:
          campaign.createdBy.firstName + ' ' + campaign.createdBy.lastName,
        email: campaign.createdBy.email,
      },
      project: {
        title: projectDoc.title,
        projectStartDate: projectDoc.startDate,
        projectEndDate: projectDoc.endDate,
      },
      teamMember: {
        fullName: teamMember.fullName,
        email: teamMember.email,
        role: teamMember.role,
        link: teamMember.link,
      },
    };
  }

  async saveCampaignFeedback(
    campaignId: string,
    linkUuid: string,
    responseContents: string,
  ) {
    if (!campaignId || !linkUuid || !responseContents) {
      this.logger.warn('Missing required fields for saving feedback');
      throw new BadRequestException(
        'Campaign ID, team member link, and response contents are required',
      );
    }

    const campaign = await this.campaignModel.findById(campaignId);
    if (!campaign) {
      this.logger.warn(`Campaign not found: ${campaignId}`);
      throw new NotFoundException('Campaign not found');
    }

    const projectEntry = campaign.projects.find((p) =>
      p.team.some((member) => member.link.endsWith(linkUuid)),
    );

    if (!projectEntry) {
      this.logger.warn(`Project entry not found for link: ${linkUuid}`);
      throw new NotFoundException(
        'Project entry with the specified link not found',
      );
    }

    try {
      const savedFeedback = await this.campaignModel.updateOne(
        { _id: campaignId, 'projects.team.link': { $regex: `${linkUuid}$` } },
        {
          $set: { 'projects.$[project].team.$[member].isResponded': true },
          $push: {
            'projects.$[project].team.$[member].responses': {
              content: responseContents,
            },
          },
        },
        {
          arrayFilters: [
            { 'project.project': projectEntry.project },
            { 'member.link': { $regex: `${linkUuid}$` } },
          ],
        },
      );
      if (savedFeedback.modifiedCount === 0) {
        throw new Error('Failed to save feedback');
      }
      this.logger.log(
        `Feedback saved for campaignId: ${campaignId}, linkUuid: ${linkUuid}`,
      );
      return { status: 'success', message: 'Feedback saved successfully' };
    } catch (error) {
      this.logger.error(
        `Error saving feedback for campaignId: ${campaignId}, linkUuid: ${linkUuid}`,
        error,
      );
      throw new Error('Failed to save feedback');
    }
  }

  async getCampaignFeedback(campaignId: string, linkUuid: string) {
    if (!campaignId || !linkUuid) {
      this.logger.warn('Campaign ID and team member link are required');
      throw new BadRequestException(
        'Campaign ID and team member link are required',
      );
    }

    const campaign = await this.campaignModel.findById(campaignId);
    if (!campaign) {
      this.logger.warn(`Campaign not found: ${campaignId}`);
      throw new NotFoundException('Campaign not found');
    }

    const projectEntry = campaign.projects.find((p) =>
      p.team.some((member) => member.link.endsWith(linkUuid)),
    );

    if (!projectEntry) {
      this.logger.warn(`Project entry not found for link: ${linkUuid}`);
      throw new NotFoundException(
        'Project entry with the specified link not found',
      );
    }

    const teamMember = projectEntry.team.find((member) =>
      member.link.endsWith(linkUuid),
    );

    if (!teamMember) {
      this.logger.warn(`Team member not found for link: ${linkUuid}`);
      throw new NotFoundException(
        'Team member with the specified link not found',
      );
    }

    this.logger.log(
      `Found feedback for campaignId: ${campaignId}, linkUuid: ${linkUuid}`,
    );
    return {
      project: projectEntry.project,
      teamMember: {
        fullName: teamMember.fullName,
        email: teamMember.email,
        role: teamMember.role,
        link: teamMember.link,
        isResponded: teamMember.isResponded,
        responseContents: teamMember.responses || [],
      },
    };
  }
}
