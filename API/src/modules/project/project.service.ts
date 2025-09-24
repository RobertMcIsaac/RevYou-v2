import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './schema/project.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
  ) {}

  async findOrCreateProjects(projects: Project[]): Promise<Types.ObjectId[]> {
    const projectIds: Types.ObjectId[] = [];

    for (const project of projects) {
      let projectDoc: Partial<Project> | null;

      if (project._id) {
        projectDoc = await this.projectModel.findById(project._id);
        if (!projectDoc?._id) {
          throw new Error(
            `Project with ID ${project._id.toString()} not found`,
          );
        }

        projectIds.push(projectDoc._id);
      } else {
        projectDoc = {
          title: project.title,
          description: project.description || '',
          startDate: project.startDate || new Date(),
          endDate: project.endDate || null,
        };

        const newProject = await this.projectModel.create(projectDoc);
        projectIds.push(newProject._id);
      }
    }

    return projectIds;
  }

  async searchProjectsByTitle(partialTitle: string): Promise<Project[]> {
    return this.projectModel
      .find({
        title: { $regex: partialTitle, $options: 'i' },
      })
      .limit(10);
  }
}
