using AspNetCore.Identity.MongoDbCore.Models;
using MongoDbGenericRepository.Attributes;

namespace centy.Domain.Entities.Auth;

[CollectionName("Users")]
public class ApplicationUser : MongoIdentityUser<Guid>
{
    public string? BaseCurrencyCode { get; init; }
}
