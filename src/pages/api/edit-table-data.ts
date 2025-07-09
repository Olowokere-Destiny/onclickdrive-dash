import { NextApiRequest, NextApiResponse } from "next";
import tabledata from "../utils/tableData.json";
import path from "path";
import { promises as fspromise } from "fs";
import { TableDetails } from "../utils/types";

export default async function editData(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const { id, admin, listing, status } = req.body;
  if (!id || !admin || !listing || !status) {
    return res.status(400).json({ message: "Bad request" });
  }
  const currentData: TableDetails | undefined = tabledata.find(
    (data) => data.id === id
  );
  if (!currentData) return res.status(404).json({ message: "Data not found" });
  const newObj: TableDetails = {
    id,
    listing,
    status,
    history: [...currentData.history, { user: admin, action: status }],
  };
  const filterData = tabledata.filter((item) => item.id !== id);
  filterData.push(newObj);
  const sortData = filterData.sort((a, b) => a.id - b.id);
  await fspromise.writeFile(
    path.join(process.cwd(), "src", "pages", "utils", "tableData.json"),
    JSON.stringify(sortData),
    { encoding: "utf8" }
  );
  return res.status(200).json({ message: "updated successfully" });
}
