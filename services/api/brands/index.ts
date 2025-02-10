import axios from 'axios';

const url = `${process.env.NEXT_PUBLIC_API_URL}/brands  `;

export const getBrands = async (token: string) => {
  try {
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` }
    });
    let brands = response.data;
    return brands.data;
  } catch (error) {
    return error;
  }
};

export const getBrand = async (token: string, id: string) => {
  try {
    const response = await axios.get(`${url}/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateBrand = async (token: string, id: string, brand: any) => {
  let updateData: any = {
    name: brand.name
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

export const CreateBrand = async (token: string, brand: any) => {
  let updateData = {
    name: brand.name
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

export const deleteBrand = async (token: any, id: any) => {
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
