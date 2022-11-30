import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Like, Raw, Repository } from 'typeorm';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardsRepository {
  constructor(
    @InjectRepository(Board) private readonly boardRepoitory: Repository<Board>,
  ) {}

  async createBoard({ title, content, secret }, userId) {
    try {
      await this.boardRepoitory.save(
        this.boardRepoitory.create({
          title,
          content,
          secret,
          user: userId,
        }),
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  async showBoard(boardId) {
    try {
      const board = await this.boardRepoitory.findOne({
        where: { id: boardId },
      });
      // board = { ...board, createdAt: board.createdAt.toDateString };
      return board;
    } catch (error) {}
  }

  async showBoards(page) {
    try {
      const [boards, totalResults] = await this.boardRepoitory.findAndCount({
        skip: (page - 1) * 6,
        take: 6,
      });
      return {
        boards,
        pages: Math.ceil(totalResults / 6),
      };
    } catch (e) {
      return { boards: [] };
    }
  }

  async updateBoard(boardId, updateBoardInput) {
    try {
      await this.boardRepoitory.save([
        {
          id: boardId,
          ...updateBoardInput,
        },
      ]);
      return true;
    } catch (e) {
      return false;
    }
  }

  async deleteBaord(boardId) {
    try {
      await this.boardRepoitory.softDelete({ id: boardId });
      return true;
    } catch (error) {
      return false;
    }
  }

  async showDeletedBoards(userId, page) {
    try {
      console.log(userId);
      const board = await this.boardRepoitory.find({
        where: { user: userId.sub },
        withDeleted: false,
      });
      console.log(board);
      const [boards, totalResults] = await this.boardRepoitory.findAndCount({
        where: { user: userId },
        withDeleted: true,
        skip: (page - 1) * 6,
        take: 6,
      });
      return {
        boards,
        pages: Math.ceil(totalResults / 6),
      };
    } catch (error) {
      return { boards: [] };
    }
  }

  async searchedBoards(searchedItem, page) {
    try {
      const [boards, totalResults] = await this.boardRepoitory.findAndCount({
        skip: (page - 1) * 6,
        take: 6,
        where: {
          title: ILike(`%${searchedItem}%`),
        },
      });
      return {
        boards,
        pages: Math.ceil(totalResults / 6),
      };
    } catch (e) {
      return { boards: [] };
    }
  }

  async restoreBoards(boardId) {
    try {
      await this.boardRepoitory.restore(boardId);
      return true;
    } catch (e) {
      return false;
    }
  }
}
