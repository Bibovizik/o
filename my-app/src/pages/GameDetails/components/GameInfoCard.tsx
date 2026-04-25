import type { ReactNode } from 'react';
import { Card, CardContent, Stack, Typography } from '@mui/material';

type GameInfoCardProps = {
  icon: ReactNode;
  label: string;
  value?: ReactNode;
  color?: string;
};

export default function GameInfoCard({
  icon,
  label,
  value,
  color = 'primary.main',
}: GameInfoCardProps) {
  return (
    <Card
      sx={{
        borderRadius: 2,
        borderLeftColor: color,
        borderLeftWidth: 3,
        borderLeftStyle: 'solid',
        height: '100%',
      }}
    >
      <CardContent sx={{ height: '100%' }}>
        <Stack
          spacing={2}
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            {icon}
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              {label}
            </Typography>
          </Stack>
          {value !== undefined && <Typography variant="h6">{value}</Typography>}
        </Stack>
      </CardContent>
    </Card>
  );
}
