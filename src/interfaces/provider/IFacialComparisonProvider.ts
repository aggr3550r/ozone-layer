import { CompareFaceDTO, VerifyDocumentDTO } from '../../dtos';

export interface IFacialComparisonProvider {
  compareFaces(input: VerifyDocumentDTO<CompareFaceDTO>): Promise<any>;
}
