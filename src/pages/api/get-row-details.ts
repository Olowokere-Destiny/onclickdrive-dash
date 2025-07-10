import { connectDb } from "@/lib/connectMongodb";
import { Table } from "@/lib/models/tableModel";
import { Types } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getRowData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.body;
  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "invalid id" });
  }
  try {
    await connectDb();
    const row = await Table.findById(id);
    if (!row) return res.status(404).json({ message: "Row not found" });
    return res.status(200).json(row);
  } catch (error) {
    return res.status(500).json({ message: "Server error occurred"+error });
  }
}
