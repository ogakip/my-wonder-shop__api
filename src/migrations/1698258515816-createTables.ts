import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1698258515816 implements MigrationInterface {
    name = 'CreateTables1698258515816'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "rating" ("id" varchar PRIMARY KEY NOT NULL, "rating" integer NOT NULL, "userId" varchar(158) NOT NULL, "productId" varchar(158) NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_comments" ("id" varchar PRIMARY KEY NOT NULL, "content" varchar(1000) NOT NULL, "userId" varchar(158) NOT NULL, "productId" varchar(158) NOT NULL, CONSTRAINT "FK_9f8304787dd13d61bc94afd07b0" FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_comments"("id", "content", "userId", "productId") SELECT "id", "content", "userId", "productId" FROM "comments"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`ALTER TABLE "temporary_comments" RENAME TO "comments"`);
        await queryRunner.query(`CREATE TABLE "temporary_rating" ("id" varchar PRIMARY KEY NOT NULL, "rating" integer NOT NULL, "userId" varchar(158) NOT NULL, "productId" varchar(158) NOT NULL, CONSTRAINT "FK_a6c53dfc89ba3188b389ef29a62" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_1fdf6f092aa907177771948f6a1" FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_rating"("id", "rating", "userId", "productId") SELECT "id", "rating", "userId", "productId" FROM "rating"`);
        await queryRunner.query(`DROP TABLE "rating"`);
        await queryRunner.query(`ALTER TABLE "temporary_rating" RENAME TO "rating"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rating" RENAME TO "temporary_rating"`);
        await queryRunner.query(`CREATE TABLE "rating" ("id" varchar PRIMARY KEY NOT NULL, "rating" integer NOT NULL, "userId" varchar(158) NOT NULL, "productId" varchar(158) NOT NULL)`);
        await queryRunner.query(`INSERT INTO "rating"("id", "rating", "userId", "productId") SELECT "id", "rating", "userId", "productId" FROM "temporary_rating"`);
        await queryRunner.query(`DROP TABLE "temporary_rating"`);
        await queryRunner.query(`ALTER TABLE "comments" RENAME TO "temporary_comments"`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" varchar PRIMARY KEY NOT NULL, "content" varchar(1000) NOT NULL, "userId" varchar(158) NOT NULL, "productId" varchar(158) NOT NULL, "rating" integer NOT NULL, CONSTRAINT "FK_9f8304787dd13d61bc94afd07b0" FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "comments"("id", "content", "userId", "productId") SELECT "id", "content", "userId", "productId" FROM "temporary_comments"`);
        await queryRunner.query(`DROP TABLE "temporary_comments"`);
        await queryRunner.query(`DROP TABLE "rating"`);
    }

}
