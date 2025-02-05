import axios from 'axios';

const url = `${process.env.NEXT_PUBLIC_API_URL}/api/clients`;

export const getClients = async (token: string) => {
  try {
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` }
    });
    let clients = response.data;
    return clients;
  } catch (error) {
    return error;
  }
};

export const getClient = async (token: string, id: string) => {
  try {
    const response = await axios.get(`${url}/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateClient = async (token: string, id: string, client: any) => {
  let updateData: any = {
    name: client.name,
    lastName: client.lastName,
    email: client.email,
    telephone: client.telephone,
    companyId: client.establishment
  };
  if (client.password) {
    updateData.password = client.password;
  }
  try {
    const response = await axios.put(`${url}/${id}`, updateData, {
      headers: { Authorization: `Bearer ${token}` }
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const CreateClient = async (token: string, client: any) => {
  let updateData = {
    name: client.name,
    lastName: client.lastName,
    email: client.email,
    telephone: client.telephone,
    password: client.password
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

export const deleteClient = async (token: any, id: any) => {
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
