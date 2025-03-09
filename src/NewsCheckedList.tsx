import React from "react";

import {
  Card,

} from './components/ui/card';
const NewsCheckedList = () => {
  const checkedNews = [
    {
      id: 1,
      articleName: "Tuty takies",
      source: "BBC News",
      editedAt: "2025-03-08 14:30",
      editedBy: "Sham",
    },
    {
      id: 2,
      articleName: "Tech Regulations",
      source: "CNN",
      editedAt: "2025-03-07 10:15",
      editedBy: "Navin",
    },
    {
      id: 3,
      articleName: "Mars Mission",
      source: "Space Daily",
      editedAt: "2025-03-06 18:45",
      editedBy: "Souza",
    },
    {
      id: 4,
      articleName: "Sun Prime",
      source: "Space Daily",
      editedAt: "2025-03-06 18:45",
      editedBy: "Souza",
    },
    {
      id: 5,
      articleName: "Moonlight",
      source: "Space Daily",
      editedAt: "2025-03-06 18:45",
      editedBy: "Souza",
    },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-900">
  <Card className="w-[400px] p-6 shadow-lg rounded-lg bg-gray-700 border border-gray-700">
      <h1 className="text-2xl font-bold mb-4 text-center text-white">
        News Checked List
      </h1>

      <div className="overflow-x-auto bg-gray-900 p-4 rounded-lg shadow-lg border border-gray-800">
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="text-gray-300 uppercase border-b border-gray-400">
            <tr>
              <th className="px-4 py-3">S.No</th>
              <th className="px-4 py-3">Article name</th>
              <th className="px-4 py-3">Source</th>
              <th className="px-4 py-3">Edited At</th>
              <th className="px-4 py-3">Edited By</th>
            </tr>
          </thead>
          <tbody>
            {checkedNews.map((news, index) => (
              <tr key={news.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                <td className="px-4 py-3">{news.id}</td>
                <td className="px-4 py-3">{news.articleName}</td>
                <td className="px-4 py-3">{news.source}</td>
                <td className="px-4 py-3">{news.editedAt}</td>
                <td className="px-4 py-3">{news.editedBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </Card>

    </div>
  );
};

export default NewsCheckedList;
