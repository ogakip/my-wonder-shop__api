import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1698187716802 implements MigrationInterface {
    name = 'CreateTables1698187716802'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_products" ("id" varchar PRIMARY KEY NOT NULL, "content" varchar(1000) NOT NULL, "userId" varchar(158) NOT NULL, "productId" varchar(158) NOT NULL, "rating" integer NOT NULL, "title" varchar(158) NOT NULL, "description" varchar(1000) NOT NULL, "price" decimal(10,2) NOT NULL, "salePrice" decimal(10,2) NOT NULL, "amount" integer NOT NULL, CONSTRAINT "UQ_9ad3670af3d8643445e4e1fb7d4" UNIQUE ("title"))`);
        await queryRunner.query(`INSERT INTO "temporary_products"("id", "content", "userId", "productId", "rating", "title", "description", "price", "salePrice", "amount") SELECT "id", "content", "userId", "productId", "rating", "title", "description", "price", "salePrice", "amount" FROM "products"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`ALTER TABLE "temporary_products" RENAME TO "products"`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" varchar PRIMARY KEY NOT NULL, "content" varchar(1000) NOT NULL, "userId" varchar(158) NOT NULL, "productId" varchar(158) NOT NULL, "rating" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_products" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar(158) NOT NULL, "description" varchar(1000) NOT NULL, "price" decimal(10,2) NOT NULL, "salePrice" decimal(10,2) NOT NULL, "amount" integer NOT NULL, CONSTRAINT "UQ_9ad3670af3d8643445e4e1fb7d4" UNIQUE ("title"))`);
        await queryRunner.query(`INSERT INTO "temporary_products"("id", "title", "description", "price", "salePrice", "amount") SELECT "id", "title", "description", "price", "salePrice", "amount" FROM "products"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`ALTER TABLE "temporary_products" RENAME TO "products"`);
        await queryRunner.query(`CREATE TABLE "temporary_comments" ("id" varchar PRIMARY KEY NOT NULL, "content" varchar(1000) NOT NULL, "userId" varchar(158) NOT NULL, "productId" varchar(158) NOT NULL, "rating" integer NOT NULL, CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_9f8304787dd13d61bc94afd07b0" FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_comments"("id", "content", "userId", "productId", "rating") SELECT "id", "content", "userId", "productId", "rating" FROM "comments"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`ALTER TABLE "temporary_comments" RENAME TO "comments"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" RENAME TO "temporary_comments"`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" varchar PRIMARY KEY NOT NULL, "content" varchar(1000) NOT NULL, "userId" varchar(158) NOT NULL, "productId" varchar(158) NOT NULL, "rating" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "comments"("id", "content", "userId", "productId", "rating") SELECT "id", "content", "userId", "productId", "rating" FROM "temporary_comments"`);
        await queryRunner.query(`DROP TABLE "temporary_comments"`);
        await queryRunner.query(`ALTER TABLE "products" RENAME TO "temporary_products"`);
        await queryRunner.query(`CREATE TABLE "products" ("id" varchar PRIMARY KEY NOT NULL, "content" varchar(1000) NOT NULL, "userId" varchar(158) NOT NULL, "productId" varchar(158) NOT NULL, "rating" integer NOT NULL, "title" varchar(158) NOT NULL, "description" varchar(1000) NOT NULL, "price" decimal(10,2) NOT NULL, "salePrice" decimal(10,2) NOT NULL, "amount" integer NOT NULL, CONSTRAINT "UQ_9ad3670af3d8643445e4e1fb7d4" UNIQUE ("title"))`);
        await queryRunner.query(`INSERT INTO "products"("id", "title", "description", "price", "salePrice", "amount") SELECT "id", "title", "description", "price", "salePrice", "amount" FROM "temporary_products"`);
        await queryRunner.query(`DROP TABLE "temporary_products"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`ALTER TABLE "products" RENAME TO "temporary_products"`);
        await queryRunner.query(`CREATE TABLE "products" ("id" varchar PRIMARY KEY NOT NULL, "content" varchar(1000) NOT NULL, "userId" varchar(158) NOT NULL, "productId" varchar(158) NOT NULL, "rating" integer NOT NULL, "title" varchar(158) NOT NULL, "description" varchar(1000) NOT NULL, "price" decimal(10,2) NOT NULL, "salePrice" decimal(10,2) NOT NULL, "amount" integer NOT NULL, CONSTRAINT "UQ_9ad3670af3d8643445e4e1fb7d4" UNIQUE ("title"), CONSTRAINT "FK_7b3b507508cd0f86a5b2e923459" FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_99d90c2a483d79f3b627fb1d5e9" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "products"("id", "content", "userId", "productId", "rating", "title", "description", "price", "salePrice", "amount") SELECT "id", "content", "userId", "productId", "rating", "title", "description", "price", "salePrice", "amount" FROM "temporary_products"`);
        await queryRunner.query(`DROP TABLE "temporary_products"`);
    }

}
