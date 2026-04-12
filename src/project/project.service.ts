import { uploadToCloudinary } from "../util/uploadToCloudinary";
import Project from "./project.model";

export const addProject = async (
  payload: IProject,
  files?: Express.Multer.File[],
) => {
  const imageUrls = await uploadToCloudinary(files || []);

  const project = await Project.create({
    ...payload,
    images: imageUrls,
  });

  return project;
};

export const updateProject = async (
  id: string,
  payload: Partial<IProject>,
  files?: Express.Multer.File[],
) => {
  let imageUrls: string[] = [];

  if (files && files.length > 0) {
    imageUrls = await uploadToCloudinary(files);
    payload.images = imageUrls;
  }

  const project = await Project.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!project) {
    throw new Error("Project not found");
  }

  return project;
};

export const deleteProject = async (id: string) => {
  const project = await Project.findByIdAndDelete(id);

  if (!project) {
    throw new Error("Project not found");
  }

  return project;
};

export const getProjectById = async (id: string) => {
  const project = await Project.findById(id);

  if (!project) {
    throw new Error("Project not found");
  }

  return project;
};

export const getAllProjects = async (query: PaginationQuery) => {
  const {
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    order = "desc",
    all = false,
    search,
  } = query;

  const filter: any = {};

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { techStack: { $regex: search, $options: "i" } },
    ];
  }

  const sortOrder = order === "asc" ? 1 : -1;
  const sortOptions: any = {
    [sortBy]: sortOrder,
  };

  let queryBuilder = Project.find(filter).sort(sortOptions);

  if (!all) {
    queryBuilder = queryBuilder.skip((page - 1) * limit).limit(limit);
  }

  const data = await queryBuilder;
  const total = await Project.countDocuments(filter);

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
