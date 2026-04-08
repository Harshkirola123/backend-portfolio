import Experience from "./experience.model";

export const createExperience = async (payload: IExperience) => {
  const result = await Experience.create(payload);
  return result;
};

export const getSingleExperience = async (id: string) => {
  const result = await Experience.findById(id);
  return result;
};

export const updateExperience = async (
  id: string,
  payload: Partial<IExperience>,
) => {
  const result = await Experience.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const deleteExperience = async (id: string) => {
  const result = await Experience.findByIdAndDelete(id);
  return result;
};

export const getAllExperiences = async (query: PaginationQuery) => {
  const {
    page = 1,
    limit = 10,
    sortBy = "startDate",
    order = "desc",
    all = false,
    search,
  } = query;

  const filter: any = {};

  if (search) {
    filter.$or = [
      { companyName: { $regex: search, $options: "i" } },
      { role: { $regex: search, $options: "i" } },
      { technologies: { $regex: search, $options: "i" } },
    ];
  }

  const sortOrder = order === "asc" ? 1 : -1;
  const sortOptions: any = {
    [sortBy]: sortOrder,
  };

  let queryBuilder = Experience.find(filter).sort(sortOptions);

  if (!all) {
    queryBuilder = queryBuilder.skip((page - 1) * limit).limit(limit);
  }

  const data = await queryBuilder;
  const total = await Experience.countDocuments(filter);

  return {
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
    data,
  };
};
