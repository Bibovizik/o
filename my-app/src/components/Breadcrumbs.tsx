import { Link } from 'react-router-dom';
import {
  Breadcrumbs as MuiBreadcrumbs,
  Stack,
  Typography,
} from '@mui/material';

interface BreadcrumbsProps {
  paths: {
    label: string;
    path: string;
    icon?: React.ReactNode;
  }[];
}

const Breadcrumbs = ({ paths }: BreadcrumbsProps) => {
  return (
    <MuiBreadcrumbs>
      {paths.map(({ path, icon, label }, index) => {
        const isLast = index === paths.length - 1;
        return (
          <Stack key={index} direction="row" spacing={1}>
            <Link
              to={path}
              style={{
                textDecoration: isLast ? 'none' : 'auto',
                color: 'inherit',
                pointerEvents: isLast ? 'none' : 'auto',
              }}
            >
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                {icon}
                <Typography
                  variant="body2"
                  sx={{ color: isLast ? 'secondary.main' : 'text.secondary' }}
                >
                  {label}
                </Typography>
              </Stack>
            </Link>
          </Stack>
        );
      })}
    </MuiBreadcrumbs>
  );
};

export default Breadcrumbs;
