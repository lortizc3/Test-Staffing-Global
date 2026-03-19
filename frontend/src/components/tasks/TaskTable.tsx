import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import type { Task } from '../../types';
import { TaskPriorityChip } from './TaskPriorityChip';
import { TaskStatusChip } from './TaskStatusChip';

export function TaskTable({ tasks }: { tasks: Task[] }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t('tasks.table.title')}</TableCell>
            <TableCell>{t('tasks.table.status')}</TableCell>
            <TableCell>{t('tasks.table.priority')}</TableCell>
            <TableCell>{t('tasks.table.assignee')}</TableCell>
            <TableCell>{t('tasks.table.createdBy')}</TableCell>
            <TableCell align="right">{t('tasks.table.action')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6}>
                <Typography color="text.secondary">{t('tasks.table.empty')}</Typography>
              </TableCell>
            </TableRow>
          ) : null}
          {tasks.map((task) => (
            <TableRow key={task.id} hover>
              <TableCell>{task.title}</TableCell>
              <TableCell><TaskStatusChip status={task.status} /></TableCell>
              <TableCell><TaskPriorityChip priority={task.priority} /></TableCell>
              <TableCell>{task.assignedTo.name}</TableCell>
              <TableCell>{task.createdBy.name}</TableCell>
              <TableCell align="right">
                <Tooltip title={t('tasks.table.viewDetail')}>
                  <IconButton onClick={() => navigate(`/app/tasks/${task.id}`)}>
                    <VisibilityRoundedIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
