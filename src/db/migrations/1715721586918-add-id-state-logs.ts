import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIdStateLogs1715721586918 implements MigrationInterface {
  name = 'AddIdStateLogs1715721586918';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "stateLogs" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "stateLogs" ADD CONSTRAINT "PK_84d63b2dc22df0a091bd6a6b634" PRIMARY KEY ("id")`
    );
    await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "vehicles_id_seq" OWNED BY "vehicles"."id"`);
    await queryRunner.query(`ALTER TABLE "vehicles" ALTER COLUMN "id" SET DEFAULT nextval('"vehicles_id_seq"')`);
    await queryRunner.query(
      `ALTER TABLE "stateLogs" ADD CONSTRAINT "FK_2c90f0cfa3678b37bf927ae193b" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "stateLogs" DROP CONSTRAINT "FK_2c90f0cfa3678b37bf927ae193b"`);
    await queryRunner.query(`ALTER TABLE "vehicles" ALTER COLUMN "id" DROP DEFAULT`);
    await queryRunner.query(`DROP SEQUENCE "vehicles_id_seq"`);
    await queryRunner.query(`ALTER TABLE "stateLogs" DROP CONSTRAINT "PK_84d63b2dc22df0a091bd6a6b634"`);
    await queryRunner.query(`ALTER TABLE "stateLogs" DROP COLUMN "id"`);
  }
}
