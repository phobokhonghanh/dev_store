import { NextResponse } from 'next/server';

const projects = [
  {
    name: 'Thạch cao nguyên phong',
    logo: 'https://via.placeholder.com/150',
    description: 'Đây là dự án về thạch cao nguyên phong. Một dự án rất thú vị.',
    link: '/projects/thach-cao-nguyen-phong',
  },
  {
    name: 'Sản phẩm',
    logo: 'https://via.placeholder.com/150',
    description: 'Đây là dự án về sản phẩm. Một dự án rất thú vị.',
    link: '/projects/san-pham',
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const search = searchParams.get('search') || '';

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(search.toLowerCase())
  );

  const itemsPerPage = 6;
  const pageCount = Math.ceil(filteredProjects.length / itemsPerPage);
  const paginatedProjects = filteredProjects.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return NextResponse.json({
    projects: paginatedProjects,
    pageCount,
  });
}
