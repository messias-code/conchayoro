import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { ProductsModule } from './products.module';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

const databaseConnection: SequelizeModuleOptions = {
  dialect: 'sqlite',
  omitNull: true,
  autoLoadModels: true,
  synchronize: true,
  storage: ':memory:', // Usar in-memory para testes
};

const createProductDto: CreateProductDto = {
  name: 'Product1',
  price: 10,
  category: 'C1',
  rating: 1,
};

const updateProductDto: UpdateProductDto = {
  name: 'Product1-updated',
  price: 11,
  category: 'C2',
  rating: 2,
};

describe('ProductsModule (e2e)', () => {
  let app: INestApplication;
  let createdProductId: number;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [SequelizeModule.forRoot(databaseConnection), ProductsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a product (POST /products)', async () => {
    const response = await request(app.getHttpServer())
      .post('/products')
      .send(createProductDto)
      .expect(HttpStatus.CREATED);

    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toEqual(createProductDto.name);

    createdProductId = response.body.id;
  });

  it('should get the product by id (GET /products/:id)', async () => {
    const response = await request(app.getHttpServer())
      .get(`/products/${createdProductId}`)
      .expect(HttpStatus.OK);

    expect(response.body.id).toEqual(createdProductId);
    expect(response.body.name).toEqual(createProductDto.name);
  });

  it('should update the product (PATCH /products/:id)', async () => {
    const response = await request(app.getHttpServer())
      .patch(`/products/${createdProductId}`)
      .send(updateProductDto)
      .expect(HttpStatus.OK);

    expect(response.body.name).toEqual(updateProductDto.name);
  });

  it('should delete the product (DELETE /products/:id)', async () => {
    await request(app.getHttpServer())
      .delete(`/products/${createdProductId}`)
      .expect(HttpStatus.NO_CONTENT);

    // Confirmar que o produto não existe mais
    await request(app.getHttpServer())
      .get(`/products/${createdProductId}`)
      .expect(HttpStatus.NOT_FOUND);
  });
});
