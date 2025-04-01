import fs from "fs";
export default ({
  packageJsonPath,
  type,
  name,
  version,
}: {
  packageJsonPath: string;
  type: "devDependencies" | "dependencies";
  name: string;
  version: string;
}) => {
  const packageJson = fs.readFileSync(packageJsonPath, "utf8");
  const packageData = JSON.parse(packageJson);
  packageData[type][name] = version;
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageData, null, 2));
};
