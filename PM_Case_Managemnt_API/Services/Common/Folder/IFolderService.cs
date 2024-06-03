using PM_Case_Managemnt_API.DTOS.Common.Archive;
using PM_Case_Managemnt_API.DTOS.PM;

namespace PM_Case_Managemnt_API.Services.Common.FolderService
{
    public interface IFolderService
    {
        public Task<ResponseMessage<int>> Add(FolderPostDto folderPostDto);
        public Task<ResponseMessage<List<FolderGetDto>>> GetAll();
        public Task<ResponseMessage<List<FolderGetDto>>> GetFilltered(Guid? shelfId = null, Guid? rowId = null);

    }
}
