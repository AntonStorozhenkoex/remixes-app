import { IRemixGetDto } from '@/graphql/types/_server';

export const genres = ['electronic', 'hiphop', 'jazz', 'metal', 'pop', 'punk', 'rock'];

export const payload: IRemixGetDto = {
  filters: undefined,
  paginate: {
    skip: 0,
    take: 7
  },
  sorts: undefined
};
