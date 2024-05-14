import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RoleFunctionallity } from "./RoleFunctionallity";
import { RoleScreen } from "./RoleScreen";
import { Users } from "./Users";

@Index("code", ["code"], { unique: true })
@Index("idx_code", ["code"], {})
@Entity("roles", { schema: "easy_api_land_db" })
export class Roles {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "code", unique: true, length: 35 })
  code: string;

  @Column("varchar", { name: "name", nullable: true, length: 50 })
  name: string | null;

  @Column("varchar", { name: "description", nullable: true, length: 400 })
  description: string | null;

  @OneToMany(
    () => RoleFunctionallity,
    (roleFunctionallity) => roleFunctionallity.roleCode2
  )
  roleFunctionallities: RoleFunctionallity[];

  @OneToMany(() => RoleScreen, (roleScreen) => roleScreen.roleCode2)
  roleScreens: RoleScreen[];

  @OneToMany(() => Users, (users) => users.roleCode2)
  users: Users[];
}
