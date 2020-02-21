import { MigrationInterface, QueryRunner } from 'typeorm';

// eslint-disable-next-line @typescript-eslint/class-name-casing
export class deckModel1582285602595 implements MigrationInterface {
  name: string = 'deckModel1582285602595';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "Deck" ("id" SERIAL NOT NULL, "class" character varying NOT NULL, CONSTRAINT "PK_de68fd377f24744252abe076b8f" PRIMARY KEY ("id"))',
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "Deck"', undefined);
  }
}
