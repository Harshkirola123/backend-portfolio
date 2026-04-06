import ErrorResponse from "../helper/errorResponse";
import EducationModel from "./education.model";

export const addEducationService = async (data: Partial<IEducation>) => {
  console.log(data);
  if (!data.school || !data.degree || !data.startDate) {
    throw new ErrorResponse("Required fields are missing", 400);
  }

  if (data.isCurrent) {
    data.endDate = undefined;
  }

  const Education = await EducationModel.create(data);
  return Education;
};

export const deleteEducation = async (id: string) => {
  const education = await EducationModel.findById(id);

  if (!education) {
    throw new ErrorResponse("Education not found", 404);
  }

  await EducationModel.findByIdAndDelete(id);

  return { message: "Education deleted successfully" };
};

export const updateEducation = async (
  id: string,
  data: Partial<IEducation>,
) => {
  const education = await EducationModel.findById(id);

  if (!education) {
    throw new ErrorResponse("Education not found", 404);
  }

  if (data.isCurrent) {
    data.endDate = undefined;
  }

  const updated = await EducationModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  return updated;
};

export const getEducationById = async (id: string) => {
  const education = await EducationModel.findById(id);

  if (!education) {
    throw new ErrorResponse("Education not found", 404);
  }

  return education;
};

export const getAllEducation = async (query: PaginationQuery) => {
  let {
    page = 1,
    limit = 10,
    sortBy = "startDate",
    order = "desc",
    all = false,
    search = "",
  } = query;

  page = Number(page);
  limit = Number(limit);
  const isAll = all === true || all === "true";

  const filter = search
    ? {
        $or: [
          { school: { $regex: search, $options: "i" } },
          { degree: { $regex: search, $options: "i" } },
        ],
      }
    : {};

  const sortOption: Record<string, 1 | -1> = {
    [sortBy]: order === "asc" ? 1 : -1,
  };

  if (isAll) {
    const data = await EducationModel.find(filter).sort(sortOption);

    return {
      data,
      pagination: null,
    };
  }

  if (page < 1 || limit < 1) {
    throw new ErrorResponse("Invalid pagination params", 400);
  }

  const skip = (page - 1) * limit;

  const total = await EducationModel.countDocuments(filter);

  const data = await EducationModel.find(filter)
    .sort(sortOption)
    .skip(skip)
    .limit(limit);

  return {
    data,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};
