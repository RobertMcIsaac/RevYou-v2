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
    const projectDocs = await Promise.all(
      projects.map(project =>
        this.projectModel
          .findOneAndUpdate(
            { title: project.title },
            { $setOnInsert: { ...project } },
            { new: true, upsert: true },
          )
          .select('_id')
          .exec()
      )
    );
    const projectIds: Types.ObjectId[] = projectDocs.map(doc => doc._id);
    return projectIds;
  }

  async searchProjectsByTitle(partialTitle: string): Promise<Project[]> {
    // Escape regex metacharacters in partialTitle to prevent regex injection
    const escapeRegex = (str: string) =>
      str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const safeTitle = escapeRegex(partialTitle);
    return this.projectModel
      .find({
        title: { $regex: safeTitle, $options: 'i' },
      })
      .limit(10);
  }
}
