import { ClassConstructor, plainToInstance } from "class-transformer";
import { validateSync } from "class-validator";

export const envDtoValidator = <U extends object>(
  dto: ClassConstructor<U>
) => {
  return function validate(config: Record<string, unknown>) {
    const validatedConfig = plainToInstance(dto, config, {
      enableImplicitConversion: true,
    });
    
    const errors = validateSync(validatedConfig, {
      skipMissingProperties: false,
    });

    if (errors.length > 0) {
      console.log(
        "env variables validation failed:",
        errors.map((e) => ({ ...e, target: undefined }))
      );
      process.exit(1);
    }

    console.log("notified");
    return validatedConfig;
  };
};
