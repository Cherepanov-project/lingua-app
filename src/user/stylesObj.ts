import type { CSSProperties } from '@mui/material/styles';
import type { SystemStyleObject } from '@mui/system';

interface StyleObject {
  RoundedTextField: CSSProperties;
  styleBox: SystemStyleObject;
}

const stylesObj: StyleObject = {
  styleBox: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    bgcolor: '#f0f4f8',
    p: '40px 100px 87px',
    borderRadius: 8,
    maxWidth: 500,
    minHeight: 608,
    mx: 'auto',
  },
  RoundedTextField: {
    borderRadius: '50px',
    height: '40px',
    padding: '0 20px',
    border: '1px solid #878787',
    width: '100%',
  },
};

export default stylesObj;
