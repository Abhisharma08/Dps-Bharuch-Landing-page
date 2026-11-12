type CloudinaryOptions = {
  width?: number;
  height?: number;
  crop?: 'fill' | 'fit' | 'limit';
};

export function getCloudinaryImageUrl(
  src: string,
  { width, height, crop = 'fill' }: CloudinaryOptions = {}
) {
  if (!src.includes('/image/upload/')) {
    return src;
  }

  const transforms = ['f_auto', 'q_auto'];

  if (width) {
    transforms.push(`w_${width}`);
  }

  if (height) {
    transforms.push(`h_${height}`);
  }

  if (width || height) {
    transforms.push(`c_${crop}`);
  }

  return src.replace('/image/upload/', `/image/upload/${transforms.join(',')}/`);
}
