import * as XLSX from 'xlsx'
import { Box } from '@mui/system'
import { IconButton } from '@mui/material'
import FileUploadIcon from '@mui/icons-material/FileUpload';

const ImportExcel = ({ Products, setProducts, setMessage }) => {

  const handleRequestImport = e => {
    const uploadedFile = e.target.files[0]
    const fileReader = new FileReader()

    fileReader.readAsArrayBuffer(uploadedFile)
    fileReader.onload = (e) => {
      const bufferArray = e.target.result
      const workbook = XLSX.read(bufferArray, { type: "buffer" })
      const data = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: 1 })
      const SliceRows =
        data.slice(1).map((r) => r.reduce((acc, x, i) => {
          acc[data[0][i]] = x;
          return acc;
        }, {}))
      setProducts(SliceRows.map((pro) => pro), ...Products)
      setMessage('import-success')
    }
  }

  return (
    <Box sx={{
      display: "flex",
      ml: 2
    }}>
      <p>Upload Excel</p>
      <input
        id="choose-file"
        type="file"
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        hidden
        onChange={(e) => { handleRequestImport(e) }}
      />
      <IconButton
        sx={{ px: 1.5 }}
        component="label"
        htmlFor='choose-file'
      >
        <FileUploadIcon />
      </IconButton >
    </Box>
  )
}

export default ImportExcel