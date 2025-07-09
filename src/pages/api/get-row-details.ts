import tabledata from "../utils/tableData.json";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getRowData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.body;
  const row = tabledata.find((row) => row.id === id);
  if (!row) return res.status(404).json({ message: "Row not found" });
  return res.status(200).json(row);
}
