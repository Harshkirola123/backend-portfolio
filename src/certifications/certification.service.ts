import CertificationModel from "./certification.model";
import { ICertification } from "./certification.schema";

export const addCertificationService = async (payload: ICertification) => {
  const certification = await CertificationModel.create(payload);
  return certification;
};

export const getAllCertifications = async (query: PaginationQuery) => {
  const {
    page = 1,
    limit = 10,
    sortBy = "issueDate",
    order = "desc",
    all = false,
    search,
    isActive,
  } = query;

  const filter: any = {};

  if (isActive !== undefined) {
    filter.isActive = isActive === true || isActive === "true";
  }

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { organization: { $regex: search, $options: "i" } },
    ];
  }

  const sortOrder = order === "asc" ? 1 : -1;
  const sortOption: any = {
    [sortBy]: sortOrder,
  };

  if (all === true || all === "true") {
    const data = await CertificationModel.find(filter).sort(sortOption);
    return {
      meta: {
        total: data.length,
      },
      data,
    };
  }

  const skip = (Number(page) - 1) * Number(limit);

  const [data, total] = await Promise.all([
    CertificationModel.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit)),
    CertificationModel.countDocuments(filter),
  ]);

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

export const getCertificationById = async (id: string) => {
  const certification = await CertificationModel.findById(id);

  if (!certification) {
    throw new Error("Certification not found");
  }

  return certification;
};

export const updateCertification = async (
  id: string,
  payload: Partial<ICertification>,
) => {
  const updatedCertification = await CertificationModel.findByIdAndUpdate(
    id,
    payload,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!updatedCertification) {
    throw new Error("Certification not found");
  }

  return updatedCertification;
};

export const deleteCertification = async (id: string) => {
  const deletedCertification = await CertificationModel.findByIdAndDelete(id);

  if (!deletedCertification) {
    throw new Error("Certification not found");
  }

  return deletedCertification;
};

export const toggleCertificationStatus = async (id: string) => {
  const certification = await CertificationModel.findById(id);

  if (!certification) {
    throw new Error("Certification not found");
  }

  certification.isActive = !certification.isActive;
  await certification.save();

  return certification;
};
