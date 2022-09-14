public with sharing class RedAccountsData {
	@AuraEnabled(cacheable=true)
	public static List<Account> getRedAccounts(Integer maxRecords) {
		List<Account> accounts = [
			SELECT Id, Name, LastActivityDate
			FROM Account
			WHERE LastActivityDate < LAST_N_MONTHS:3
			WITH SECURITY_ENFORCED
			ORDER BY LastActivityDate ASC
			LIMIT :maxRecords
		];
		return accounts;
	}
}
