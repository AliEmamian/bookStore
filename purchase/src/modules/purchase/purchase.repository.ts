import { Purchase } from '../../entities/purchase.entity';
import { DataSource, ObjectId, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { getManager } from "typeorm";

@Injectable()
export class PurchaseRepository extends Repository<Purchase> {
  constructor(private readonly dataSource: DataSource) {
    super(Purchase, dataSource.createEntityManager());
  }

  async createPurchase(payload: Purchase) {
    try {
      let res = await this.save(payload)
      return res.id;
    }
    catch (e) {
      console.log(e);

      throw e;
    }
  }

  async get(purchaseQuery): Promise<Purchase[]> {
    const query: any = {};

    for (const [key, value] of Object.entries(purchaseQuery)) {
      if (value !== undefined && value !== null) { // Check for both undefined and null
        query[key] = value; // Add valid key-value pairs to the query object
      }
    }
    const purchase = await this.find(query)
    return purchase
  }

  async getById(query): Promise<Purchase> {

    const purchases = await this.find()
    const purchase = purchases.find((element) => element.id == new ObjectId(query.id));

    return purchase
  }

  async edit(id, filter): Promise<boolean> {
    let {
      status,
      totalPrice,
      discount,
      finalPrice,
      basket,
      authority
    } =
      filter;


    try {
      let res = await this.update(id, {
        status,
        totalPrice,
        discount,
        finalPrice,
        basket,
        authority
      });

      if (!res.affected) {
        throw new NotFoundException('Purchase Not Found !');
      }
      return true;
    }
    catch (e) {
      console.log(e);
      return false
    }
  }


}
