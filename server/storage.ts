import { users, compatibilityResults, type User, type InsertUser, type CompatibilityResult, type InsertCompatibilityResult } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  saveCompatibilityResult(result: InsertCompatibilityResult): Promise<CompatibilityResult>;
  getCompatibilityResult(shareUrl: string): Promise<CompatibilityResult | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private compatibilityResults: Map<string, CompatibilityResult>;
  currentUserId: number;
  currentCompatibilityId: number;

  constructor() {
    this.users = new Map();
    this.compatibilityResults = new Map();
    this.currentUserId = 1;
    this.currentCompatibilityId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async saveCompatibilityResult(result: InsertCompatibilityResult): Promise<CompatibilityResult> {
    const id = this.currentCompatibilityId++;
    const fullResult: CompatibilityResult = { ...result, id };
    this.compatibilityResults.set(result.shareUrl, fullResult);
    return fullResult;
  }

  async getCompatibilityResult(shareUrl: string): Promise<CompatibilityResult | undefined> {
    return this.compatibilityResults.get(shareUrl);
  }
}

export const storage = new MemStorage();
