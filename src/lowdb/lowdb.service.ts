import { Injectable } from '@nestjs/common';
import * as lowdb from 'lowdb';
import * as FileAsync from 'lowdb/adapters/FileAsync';
import * as uuid from 'uuid';

@Injectable()
export class LowdbService {
  private db: lowdb.LowdbAsync<any>;

  constructor() {
    this.initDatabase();
  }

  private async initDatabase() {
    const adapter = new FileAsync('db.json');
    this.db = await lowdb(adapter);
    // const values = await this.db.get(collectionName).value();
    // if (!values) {
    //   await this.db.set(collectionName, []).write();
    // }
  }

  async findAll(collectionName: string): Promise<any> {
    if (!this.isCollectionExists(collectionName)) {
      this.db.set(collectionName, []).write();
    }

    const values = await this.db.get(collectionName).value();
    return values;
  }

  async find(condition: object, collectionName: string): Promise<any> {
    if (!this.isCollectionExists(collectionName)) {
      this.db.set(collectionName, []).write();
    }

    const values = await this.db.get(collectionName).find(condition).value();
    return values;
  }

  async findById(id: string, collectionName: string) {
    if (!this.isCollectionExists(collectionName)) {
      this.db.set(collectionName, []).write();
    }

    const values = await this.db.get(collectionName).value();
    return values.find((val) => val.id === id);
  }

  async filterById(id: string, collectionName: string) {
    if (!this.isCollectionExists(collectionName)) {
      this.db.set(collectionName, []).write();
    }

    const values = await this.db.get(collectionName).value();
    return values.filter((val) => val.postId === id);
  }

  update(id: string, record: object, collectionName: string) {
    if (!this.isCollectionExists(collectionName)) {
      this.db.set(collectionName, []).write();
    }

    const listData = this.db.get(collectionName).value();
    const newListData = listData.map((el: Record<string, unknown>) => {
      if (el.id === id) {
        return Object.assign(el, record);
      } else {
        return el;
      }
    });

    this.db.set(collectionName, newListData).write();

    return record;
  }

  isCollectionExists(collectionName: string): boolean {
    if (!this.db.get(collectionName).value()) return false;
    return true;
  }

  add(record: any, collectionName: string): Promise<any> {
    if (!this.isCollectionExists(collectionName)) {
      this.db.set(collectionName, []).write();
    }

    const listData = this.db.get(collectionName).value();
    record.id = uuid.v1();
    listData.push(record);
    this.db.set(collectionName, listData).write();

    return record;
  }

  delete(id: string, collectionName: string) {
    if (!this.isCollectionExists(collectionName)) {
      this.db.set(collectionName, []).write();
    }

    const listData = this.db.get(collectionName).value();
    const newListData = listData.filter((el) => el.id !== id);
    this.db.set(collectionName, newListData).write();
  }
}
