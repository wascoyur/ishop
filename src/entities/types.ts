export type Product = {
  id: string;
  name: string;
  photo?: string;
  desc?: string;
  createdAt: Date;
  updatedAt: Date;
  oldPrice?: number;
  price: number;
  category: Category;
};
export type Category = {
  id: string;
  name: string;
  photo?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type OrderProduct = {
  _id: string; // служебный id - это не id продукта
  product: Product;
  quantity: number;
};

export type Pagination = {
  pageSize?: number;
  pageNumber?: number;
};

export type Sorting = {
  type: "ASC" | "DESC";
  field: "id" | "createdAt" | "updatedAt" | "name";
};

export type ServerErrors = {
  errors: {
    extensions: {
      code: ErrorCode;
    };

    name: string;
    fieldName?: string;
    stack: string;
    message: string;
  }[];
};
export type AuthResult = {
  token: string;
};
export type BucketItem = { productId: number; count: number };

export enum ErrorCode {
  ERR_INCORRECT_EMAIL_OR_PASSWORD = "ERR_INCORRECT_EMAIL_OR_PASSWORD", // Если не корректный email или пароль
  ERR_ACCOUNT_ALREADY_EXIST = "ERR_ACCOUNT_ALREADY_EXIST", // При регистрации если пользователь уже существует
  ERR_FIELD_REQUIRED = "ERR_FIELD_REQUIRED", // Обязательное поле. В ошибке будет дополнительное поле fieldName с указанием, какое конкретно поле обязательно
  ERR_INCORRECT_PASSWORD = "ERR_INCORRECT_PASSWORD", // Некорректный старый пароль при попытке его изменить
  ERR_INVALID_PASSWORD = "ERR_INVALID_PASSWORD", // Пароль не соответствует регулярному выражению /^[\w-@{}()#$%^&*+=!~]{8,}$/
  ERR_NOT_VALID = "ERR_NOT_VALID", // Не валидный id сущности
  ERR_AUTH = "ERR_AUTH", // Токен не передан, либо не прошел авторизацию
  ERR_NO_FILES = "ERR_NO_FILES", // Ошибка при загрузке файлов
  ERR_NOT_ALLOWED = "ERR_NOT_ALLOWED", // Нет доступа к данной операции (нельзя редактировать заказ другого пользователя)
  ERR_NOT_FOUND = "ERR_NOT_FOUND", // Сущность не найдена
  ERR_VALIDATION_ERROR = "ERR_VALIDATION_ERROR", // Не валидные данные, например, не указано name
  ERR_INVALID_QUERY_PARAMS = "ERR_INVALID_QUERY_PARAMS", // Все GET запросы могут принимать данные запроса в search params в формате { [key: string]: string // Нужно использовать JSON.stringify() }

  ERR_INTERNAL_SERVER = "ERR_INTERNAL_SERVER", // Серверная ошибка. Обратитесь ко мне, этой ошибки быть не должно
}
