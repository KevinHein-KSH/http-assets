export type ApiUser = {
  id: number;
  email: string;
  password: string;
  name: string;
  role: 'customer' | 'admin' | 'seller' | string; // widen if unsure
  avatar: string;
  creationAt: string;  // ISO string from API
  updatedAt: string;   // ISO string from API
};

export async function getUsers(url: string): Promise<ApiUser[]> {
  const data = await fetch(url)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json() as Promise<ApiUser[]>;
    })
    .then(data => {
      console.log('In the fetch:', data);
      return data; // <— return it so the promise resolves to ApiUser[]
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      throw error; // rethrow if you want callers to handle it
    });

  return data;
}
// Note: You can also use Axios or other libraries for HTTP requests