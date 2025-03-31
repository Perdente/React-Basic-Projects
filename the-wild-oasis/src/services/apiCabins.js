import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
  const { data: cabins, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);

    throw new Error('Cabins could not be loaded');
  }

  return cabins;
}

export async function createEditCabin(newCabin, id) {
  // https://tdkkbehrcsymzxxqmnhe.supabase.co/storage/v1/object/public/cabin-images/cabin_003.jpg

  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/', '');
  const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from('cabins');

  // 1. Create cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // 2. Edit Cabin
  if (id)
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq('id', id)
      .select();

  const { data, error } = await query.select().single();
  if (error) {
    console.error(error);
    throw new Error('Cabin could not be created');
  }

  // 2. Upload image
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage.from('cabin-images').upload(imageName, newCabin.image);

  // 3. Delete the cabin if there was an error
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);
    console.log(storageError);
    throw new Error('Cabin image could not be uploaded');
  }

  // const avatarFile = event.target.files[0]
}

export async function deleteCabin(id) {
  const { error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);

    throw new Error('Cabin could not be deleted');
  }
}
