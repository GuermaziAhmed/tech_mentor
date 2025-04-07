import Joi from 'joi';

export const validateSearchParams = (query) => {
  const schema = Joi.object({
    search: Joi.string().trim().allow(''),
    specializations: Joi.array().items(Joi.string()),
    minRate: Joi.number().min(0),
    maxRate: Joi.number().min(0),
    rating: Joi.number().min(0).max(5),
    availability: Joi.object({
      day: Joi.string().valid(
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ),
      startTime: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
      endTime: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    }),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10)
  });

  return schema.validate(query, { stripUnknown: true });
};