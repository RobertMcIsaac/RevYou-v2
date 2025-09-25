import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { InjectModel } from '@nestjs/mongoose';
import { Campaign } from './schema/campaign.schema';
import { Model, Types } from 'mongoose';
import { ProjectService } from '../project/project.service';
import { Project } from '../project/schema/project.schema';
import { Respondent } from './schema/subdocument/respondent.schema';

interface ProjectWithTeam extends Project {
  team?: Respondent[];
}

@Injectable()
export class CampaignService {
  constructor(
    @InjectModel(Campaign.name) private campaignModel: Model<Campaign>,
    private readonly userService: UserService,
    private readonly projectService: ProjectService,
  ) {}

  async createCampaign(
    title: string,
    createdBy: string,
    projects: ProjectWithTeam[],
    description?: string,
  ) {
    if (!title || !createdBy || !projects) {
      throw new Error('Title, createdBy, and projects are required');
    }

    const creatorId = await this.userService.findUserById(createdBy);
    if (!creatorId) {
      throw new Error("User's id provided not found in the database");
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
            responded: member.responded ?? false,
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

    return await this.campaignModel.create(newCampaign);
  }

  async getCampaignsByUser(userId: string) {
    if (!userId) {
      throw new Error('User ID is required');
    }

    return await this.campaignModel
      .find({ createdBy: userId })
      .populate('projects.project');
  }
  async getCampaignById(campaignId: string) {
    if (!campaignId) {
      throw new Error('Campaign ID is not set');
    }
    const campaign = await this.campaignModel
      .findById(campaignId)
      .populate('projects.project')
      .populate('createdBy', 'email fullName');
    if (!campaign) {
      throw new Error('Campaign not found');
    }
    return campaign;
  }

  async getCampaignByLink(linkUuid: string) {
    if (!linkUuid) {
      throw new Error('Link is not set');
    }
    const campaign = await this.campaignModel
      .findOne({ 'projects.team.link': { $regex: `${linkUuid}$` } })
      .populate('projects.project')
      .populate('createdBy', 'email firstName lastName');
    if (!campaign) {
      throw new Error('Campaign not found');
    }

    const projectEntry = campaign.projects.find((p) =>
      p.team.some((member) => member.link.endsWith(linkUuid)),
    );
    if (!projectEntry) {
      throw new Error('Project entry with the specified link not found');
    }
    const teamMember = projectEntry.team.find((member) =>
      member.link.endsWith(linkUuid),
    );
    if (!teamMember) {
      throw new Error('Team member with the specified link not found');
    }
    const campaignId = campaign._id.toString();
    return {
      campaignId: campaignId,
      title: campaign.title,
      requestor: {
        fullName:
          campaign.createdBy.firstName + ' ' + campaign.createdBy.lastName,
        email: campaign.createdBy.email,
      },
      project: {
        title: projectEntry.project.title,
        projectStartDate: projectEntry.project.startDate,
        projectEndDate: projectEntry.project.endDate,
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
      throw new Error(
        'Campaign ID, team member link, and response contents are required',
      );
    }

    const campaign = await this.campaignModel.findById(campaignId);
    if (!campaign) {
      throw new Error('Campaign not found');
    }

    const projectEntry = campaign.projects.find((p) =>
      p.team.some((member) => member.link.endsWith(linkUuid)),
    );

    if (!projectEntry) {
      throw new Error('Project entry with the specified link not found');
    }

    const savedFeedback = await this.campaignModel.updateOne(
      { _id: campaignId, 'projects.team.link': { $regex: `${linkUuid}$` } },
      {
        $set: { 'projects.$[project].team.$[member].responded': true },
        $push: {
          'projects.$[project].team.$[member].responses': {
            content: responseContents,
          },
        },
      },
      {
        arrayFilters: [
          { 'project.project': projectEntry.project._id },
          { 'member.link': { $regex: `${linkUuid}$` } },
        ],
      },
    );

    if (savedFeedback.modifiedCount === 0) {
      throw new Error('Failed to save feedback');
    }

    return {
      status: 'success',
      message: 'Feedback saved successfully',
    };
  }

  async getCampaignFeedback(campaignId: string, linkUuid: string) {
    if (!campaignId || !linkUuid) {
      throw new Error('Campaign ID and team member link are required');
    }

    const campaign = await this.campaignModel.findById(campaignId);
    if (!campaign) {
      throw new Error('Campaign not found');
    }

    const projectEntry = campaign.projects.find((p) =>
      p.team.some((member) => member.link.endsWith(linkUuid)),
    );

    if (!projectEntry) {
      throw new Error('Project entry with the specified link not found');
    }

    const teamMember = projectEntry.team.find((member) =>
      member.link.endsWith(linkUuid),
    );

    if (!teamMember) {
      throw new Error('Team member with the specified link not found');
    }

    return {
      project: projectEntry.project,
      teamMember: {
        fullName: teamMember.fullName,
        email: teamMember.email,
        role: teamMember.role,
        link: teamMember.link,
        isResponded: teamMember.responded,
        responseContents: teamMember.responses || '',
      },
    };
  }
}
