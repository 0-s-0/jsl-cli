import fs from "fs";
export default ({
  packageJsonPath,
  type,
  name,
}: {
  packageJsonPath: string;
  type: "devDependencies" | "dependencies";
  name: string;
}) => {
  const packageJson = fs.readFileSync(packageJsonPath, "utf8");
  const packageData = JSON.parse(packageJson);
  delete packageData[type][name];
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageData, null, 2));
};
