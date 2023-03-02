import { Request, Response, NextFunction } from 'express';
import { pool } from 'src/utils';

export const getSongs = async (req: Request, res: Response) => {
  try {
    const response = await pool.query('SELECT * FROM songs');
    return res.status(200).json({
      status: true,
      data: response.rows,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const getSongById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const response = await pool.query('SELECT * FROM songs WHERE id = $1', [
      id,
    ]);
    return res.status(200).json({
      status: true,
      data: response.rows,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const createSong = async (req: Request, res: Response) => {
  const { title, category, difficulty } = req.body;
  try {
    const response = await pool.query(
      'INSERT INTO songs (title, category, difficulty) VALUES ($1, $2, $3)',
      [title, category, difficulty]
    );
    return res.status(200).json({
      status: true,
      message: 'Song created successfully',
      data: response.rows,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const updateSong = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { title, category, difficulty } = req.body;
  try {
    await pool.query(
      'UPDATE songs SET title = $1, category = $2, difficulty = $3 WHERE id = $4',
      [title, category, difficulty, id]
    );
    return res.status(200).json({
      status: true,
      message: 'Song updated successfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const deleteSong = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    await pool.query('DELETE FROM users where id = $1', [id]);
    return res.status(200).json({
      status: true,
      message: 'Song deleted successfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
