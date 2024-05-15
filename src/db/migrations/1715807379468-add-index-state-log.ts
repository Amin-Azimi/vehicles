import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIndexStateLog1715807379468 implements MigrationInterface {
    name = 'AddIndexStateLog1715807379468'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_15ca7182c0d7281305c5c60cb1" ON "stateLogs" ("timestamp") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_15ca7182c0d7281305c5c60cb1"`);
    }

}
