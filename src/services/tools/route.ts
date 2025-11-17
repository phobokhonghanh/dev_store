import { NextResponse } from 'next/server';

const tools = [
  {
    name: 'Công cụ 1',
    logo: 'https://via.placeholder.com/150',
    description: 'Đây là một công cụ rất hữu ích.',
    link: '/tools/tool-1',
  },
  {
    name: 'Công cụ 2',
    logo: 'https://via.placeholder.com/150',
    description: 'Đây là một công cụ hữu ích khác.',
    link: '/tools/tool-2',
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const search = searchParams.get('search') || '';

  const filteredTools = tools.filter((tool) =>
    tool.name.toLowerCase().includes(search.toLowerCase())
  );

  const itemsPerPage = 6;
  const pageCount = Math.ceil(filteredTools.length / itemsPerPage);
  const paginatedTools = filteredTools.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return NextResponse.json({
    tools: paginatedTools,
    pageCount,
  });
}
