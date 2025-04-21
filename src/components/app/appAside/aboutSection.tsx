import { Card, CardContent, Typography } from '@mui/material';

export const AboutSection = ({ about }: { about: string }) => (
  <Card variant="outlined">
    <CardContent>
      <Typography variant="body2" color="textSecondary" fontWeight={'bold'} marginBottom={2}>
        소개글
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {about.split('<br/>').map((line, index) => (
          <span key={index}>
            {line}
            <br />
          </span>
        ))}
      </Typography>
    </CardContent>
  </Card>
);
