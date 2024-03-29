﻿using MongoDB.Driver;
using centy.Domain.Entities.Categories;

namespace centy.Infrastructure.Database.Repositories;

public class CategoriesRepository : BaseRepository, ICategoriesRepository
{
    private readonly IMongoCollection<Category> _categories;

    public CategoriesRepository()
    {
        _categories = Database.GetCollection<Category>("Categories");
    }

    public async Task<Category?> GetUserCategory(Guid id, Guid userId)
    {
        return await _categories.Find(c => c.Id == id && c.UserId == userId).FirstOrDefaultAsync();
    }

    public async Task<List<Category>> GetUserCategoriesAsync(Guid userId)
    {
        return await _categories.Find(c => c.UserId == userId).ToListAsync();
    }

    public async Task InsertAsync(Category category)
    {
        await _categories.InsertOneAsync(category);
    }

    public async Task<bool> UpdateAsync(Guid id, string? name, Guid iconId, Guid userId)
    {
        var result = await _categories.UpdateOneAsync(c => c.Id == id && c.UserId == userId,
            Builders<Category>
                .Update
                .Set(r => r.Name, name)
                .Set(r => r.IconId, iconId),
            new UpdateOptions() { IsUpsert = true });

        return result.IsAcknowledged && result.ModifiedCount > 0;
    }

    public async Task DeleteUserCategoriesAsync(List<Guid> categoryIds, Guid userId)
    {
        await _categories.DeleteManyAsync(c => categoryIds.Contains(c.Id) && c.UserId == userId);
    }
}
