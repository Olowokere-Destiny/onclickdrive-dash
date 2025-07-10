import tabledata from "@/utils/tableData.json";
import { NextApiRequest, NextApiResponse } from "next";


export default async function getTableData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return res.status(200).json(tabledata);
}
