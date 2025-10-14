import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { PinoLogger } from 'nestjs-pino';
import { BaseDocument } from './base.document.type';
// TDocument must contain _id, createdAt, updatedAt. TDocument is supposed to be the service
@Injectable()
export class BaseRepository<TDocument extends BaseDocument> {
  protected readonly logger: PinoLogger;

  constructor(protected readonly model: Model<TDocument>) {}

  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    if (!createdDocument) {
      this.logger.debug(`The document was not created ${document}`);
      throw new HttpException('document was not created', 400);
    }
    return (await createdDocument.save()).toJSON() as TDocument;
  }

  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model.findOne(filterQuery).lean<TDocument>();
    if (!document) {
      this.logger.debug(`Document not found with filter:`, filterQuery);
      throw new NotFoundException('Document not found');
    }
    return document;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ): Promise<TDocument> {
    const document = await this.model
      .findOneAndUpdate(filterQuery, update, {
        new: true,
      })
      .lean<TDocument>();
    if (!document) {
      this.logger.debug(`Document not found with filter:`, filterQuery);
      throw new NotFoundException('Document not found');
    }
    return document;
  }

  async findMany(filterQuery: FilterQuery<TDocument>): Promise<TDocument[]> {
    const multipleDocs = this.model.find(filterQuery).lean<TDocument[]>();
    if (!multipleDocs) {
      this.logger.debug(
        `Documents were not found by this filter query ${filterQuery}`,
      );
      throw new NotFoundException('No documents found');
    }
    return multipleDocs;
  }

  async findAll(): Promise<TDocument[]> {
    const allDocs = await this.model.find({}).lean<TDocument[]>();
    if (allDocs.length === 0) {
      this.logger.warn('No documents found');
      throw new NotFoundException('No documents found');
    }
    return allDocs;
  }

  async findOneAndDelete(
    filterQuery: FilterQuery<TDocument>,
  ): Promise<TDocument> {
    const document = await this.model
      .findOneAndDelete(filterQuery)
      .lean<TDocument>();
    if (!document) {
      this.logger.warn(`Document not found with filter:`, filterQuery);
      throw new NotFoundException('Document not found');
    }
    return document;
  }
}
