import { Book } from '../../entities/book.entity';
import { DataSource, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { getManager } from "typeorm";

@Injectable()
export class BookRepository extends Repository<Book> {
  constructor(private readonly dataSource: DataSource) {
    super(Book, dataSource.createEntityManager());
  }

  async createBook(payload: Book) {
    try {
      let res = await this.save(payload)
      return res.id;
    }
    catch (e) {
      console.log(e);

      throw e;
    }
  }

  async get(bookQuery): Promise<Book[]> {
    const query: any = {};

    for (const [key, value] of Object.entries(bookQuery)) {
      if (value !== undefined && value !== null) { // Check for both undefined and null
        query[key] = value; // Add valid key-value pairs to the query object
      }
    }
    const book = await this.find(query)
    return book
  }

  async getById(query): Promise<Book> {

    const user = await this.findOne(query.id)
    return user
  }

  async edit(id, filter): Promise<boolean> {
    let {
      name,
      genre,
      year,
      author,
      price
    } =
      filter;



    try {
      let book = await this.findOne(id);
      if (!name) name = book.name
      if (!genre) genre = book.genre
      if (!year) year = book.year
      if (!author) author = book.author
      if (!price) price = book.price

      let res = await this.update(id, {
        name,
        genre,
        year,
        author,
        price
      });

      if (!res.affected) {
        throw new NotFoundException('Book Not Found !');
      }
      return true;
    }
    catch (e) {
      console.log(e);
      return false
    }
  }


}
