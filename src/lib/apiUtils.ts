interface BuildEndpointParams {
  baseUrl: string;
  page: number;
  searchTerm?: string;
  sort?: string;
  additionalParams?: Record<string, string | number>;
}

export function buildPaginatedEndpoint({
  baseUrl,
  page,
  searchTerm,
  sort,
  additionalParams = {},
}: BuildEndpointParams): string {
  const params = new URLSearchParams();

  params.append("page", page.toString());

  if (searchTerm?.trim()) {
    params.append("search", searchTerm.trim());
  }

  if (sort) {
    params.append("ordering", sort);
  }

  Object.entries(additionalParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.append(key, value.toString());
    }
  });

  return `${baseUrl}?${params.toString()}`;
}
