import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project, ProjectDocument } from './schema/project.schema';
import { Model, Types } from 'mongoose';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
  ) {}

  async findOrCreateProjects(projects: CreateProjectDto[]) {
    const projectIds: Types.ObjectId[] = [];

    for (const project of projects) {
      const projectDoc = await this.projectModel
        .findOneAndUpdate(
          { title: project.title },
          { $setOnInsert: { ...project } },
          { new: true, upsert: true },
        )
        .select('_id')
        .exec();
      projectIds.push(projectDoc._id);
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
