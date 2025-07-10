import { connectDb } from "@/lib/connectMongodb";
import { Table } from "@/lib/models/tableModel";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getTableData(
  req: NextApiRequest,
  res: NextApiResponse
) {

  try {
    await connectDb();
    const tabel = await Table.find({});
    return res.status(200).json(tabel);
  } catch (error) {
    return res.status(500).json({ message: "Server error occurred" +error});
  }
}
