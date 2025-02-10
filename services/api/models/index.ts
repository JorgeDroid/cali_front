import axios from 'axios';

const url = `${process.env.NEXT_PUBLIC_API_URL}/models  `;

export const getModels = async (token: string) => {
  try {
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` }
    });
    let models = response.data;
    return models.data;
  } catch (error) {
    return error;
  }
};

export const getModel = async (token: string, id: string) => {
  try {
    const response = await axios.get(`${url}/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateModel = async (token: string, id: string, model: any) => {
  let updateData: any = {
    name: model.name
  };
  try {
    const response = await axios.put(`${url}/${id}`, updateData, {
      headers: { Authorization: `Bearer ${token}` }
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const CreateModel = async (token: string, model: any) => {
  let updateData = {
    name: model.name
  };
  try {
    const response = await axios.post(`${url}`, updateData, {
      headers: { Authorization: `Bearer ${token}` }
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const deleteModel = async (token: any, id: any) => {
  try {
    const response = await axios.delete(`${url}/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

// const parseClient = (client:any):ClientType => {
//   return {
//     id: client.id,
//     name: `${client.user.name} ${client.user.lastName}`,
//     company: client.company.name,
//     phone: client.telephone,
//     email: client.user.email,
//   }
// }
